import { useEffect, useState } from 'react';
import { Button } from 'components/Button';
import { ContractAddress } from 'components/ContractAddress';
import { useGetPollDetails } from './hooks';

export const Voting = () => {
  const { pollQuestion, pollOptions, fetchPollDetails } = useGetPollDetails();
//   const { castVote, hasPendingTransactions } = useCastVote();
const hasPendingTransactions = false;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  useEffect(() => {
    fetchPollDetails();
  }, []);

  const onVote = async () => {
    if (selectedOptionIndex !== null) {
    //   await castVote(selectedOptionIndex);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-bold">Poll Question</h2>
        <p className="text-gray-700">{pollQuestion || 'Loading...'}</p>
      </div>

      <div>
        <h3 className="text-lg font-semibold">Options</h3>
        <ul className="list-disc ml-5">
          {pollOptions.length > 0 ? (
            pollOptions.map((option, index) => (
              <li key={index} className="my-2">
                <label>
                  <input
                    type="radio"
                    name="voteOption"
                    value={index}
                    disabled={hasPendingTransactions}
                    onChange={() => setSelectedOptionIndex(index)}
                  />
                  <span className="ml-2">
                    {option.name} ({option.voteCount} votes)
                  </span>
                </label>
              </li>
            ))
          ) : (
            <p>Loading options...</p>
          )}
        </ul>
      </div>

      <Button
        disabled={selectedOptionIndex === null || hasPendingTransactions}
        onClick={onVote}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-300"
      >
        Vote
      </Button>

      <ContractAddress />
    </div>
  );
};
