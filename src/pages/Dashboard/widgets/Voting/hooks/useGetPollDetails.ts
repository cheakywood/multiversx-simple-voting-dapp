import { useEffect, useState } from 'react';
import { useGetNetworkConfig } from 'hooks';
import { ContractFunction, ResultsParser, ProxyNetworkProvider } from 'utils';
import { smartContract } from 'utils/smartContract';

const resultsParser = new ResultsParser();

/**
 * Decodes a buffer value to a string safely.
 * @param buffer The buffer to decode.
 * @returns Decoded string or an empty string.
 */
const decodeValue = (buffer: Uint8Array | undefined): string => {
  if (!buffer) return '';
  try {
    const decoder = new TextDecoder();
    return decoder.decode(buffer);
  } catch {
    return '';
  }
};

/**
 * Parses the poll options from the smart contract response.
 * @param data The smart contract response data.
 * @returns An array of poll options with name and vote count.
 */
const parsePollOptions = (data: any): { name: string; voteCount: number }[] => {
  const items = data[0]?.backingCollection?.items || [];
  return items.map((item: any) => {
    const fields = item.fields || [];

    // Decode the "name" field
    const nameField = fields.find((field: any) => field.name === 'name');
    const name = decodeValue(nameField?.value?.value);

    // Parse the "vote_count" field
    const voteCountField = fields.find(
      (field: any) => field.name === 'vote_count'
    );
    const voteCount = parseInt(voteCountField?.value?.value || '0', 10);

    return {
      name: name || 'Unknown',
      voteCount: isNaN(voteCount) ? 0 : voteCount,
    };
  });
};

/**
 * Custom hook to fetch poll details from the smart contract.
 * @returns Poll question, options, and a refetch function.
 */
export const useGetPollDetails = () => {
  const { network } = useGetNetworkConfig();
  const [pollQuestion, setPollQuestion] = useState<string | null>(null);
  const [pollOptions, setPollOptions] = useState<
    { name: string; voteCount: number }[]
  >([]);

  const proxy = new ProxyNetworkProvider(network.apiAddress);

  const fetchPollDetails = async () => {
    try {
      // Fetch poll question
      const questionQuery = smartContract.createQuery({
        func: new ContractFunction('getPollQuestion'),
      });
      const questionResponse = await proxy.queryContract(questionQuery);
      const question = resultsParser
        .parseQueryResponse(
          questionResponse,
          smartContract.getEndpoint('getPollQuestion')
        )
        .firstValue?.toString();
      setPollQuestion(question || 'No question found.');

      // Fetch poll options
      const optionsQuery = smartContract.createQuery({
        func: new ContractFunction('getOptions'),
      });
      const optionsResponse = await proxy.queryContract(optionsQuery);
      const parsedOptions = parsePollOptions(
        resultsParser.parseQueryResponse(
          optionsResponse,
          smartContract.getEndpoint('getOptions')
        ).values || []
      );

      setPollOptions(parsedOptions);
    } catch (error) {
      console.error('Error fetching poll details:', error);
    }
  };

  useEffect(() => {
    fetchPollDetails();
  }, []);

  return { pollQuestion, pollOptions, fetchPollDetails };
};
