import { AppBar } from "@/components/AppBar";
import ReviewCard from "@/components/ReviewCard";
import { useEffect, useState } from "react";
import { Review } from "@/models/Review";
import * as web3 from "@solana/web3.js";
import { fetchReviews } from "@/util/fetchReviews";
import { useWallet } from "@solana/wallet-adapter-react";
import ReviewForm from "@/components/Form";

//Replace with your own Program_id
const REVIEW_PROGRAM_ID =
  "D7VHn82pVMWqppuXJSe4M3ExL1ZAhdUzsM8nLC8wznCE";

export default function Home() {
  const connection = new web3.Connection(
    web3.clusterApiUrl("devnet")
  );
  const { publicKey, sendTransaction } =
    useWallet();
  const [txid, setTxid] = useState("");
  const [reviews, setReviews] = useState<
    Review[]
  >([]);

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [description, setDescription] =
    useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      const reviews = await fetchReviews(
        REVIEW_PROGRAM_ID,
        connection
      );
      setReviews(reviews);
    };
    fetchAccounts();
  }, []);

  const handleSubmit = () => {
    const review = new Review(
      title,
      rating,
      description,
      location
    );
    handleTransactionSubmit(review);
  };

  const handleTransactionSubmit = async (
    review: Review
  ) => {
    if (!publicKey) {
      alert("Connect your wallet");
      return;
    }

    const buffer = review.serialize();
    const transaction = new web3.Transaction();

    const [pda] =
      await web3.PublicKey.findProgramAddress(
        [
          publicKey.toBuffer(),
          Buffer.from(review.title),
        ],
        new web3.PublicKey(REVIEW_PROGRAM_ID)
      );

    const instruction =
      new web3.TransactionInstruction({
        data: buffer,
        programId: new web3.PublicKey(
          REVIEW_PROGRAM_ID
        ),
        keys: [
          {
            pubkey: publicKey,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: pda,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: web3.SystemProgram.programId,
            isSigner: false,
            isWritable: false,
          },
        ],
      });

    transaction.add(instruction);

    try {
      const txid = await sendTransaction(
        transaction,
        connection
      );
      setTxid(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 `}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <AppBar />
      </div>

      <div className="after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:from-sky-900 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <ReviewForm
          title={title}
          description={description}
          rating={rating}
          location={location}
          setLocation={setLocation}
          setTitle={setTitle}
          setDescription={setDescription}
          setRating={setRating}
          handleSubmit={handleSubmit}
        />
      </div>

      {txid && <div>{txid}</div>}

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-3 lg:text-left">
        {reviews &&
          reviews.map((review) => {
            return (
              <ReviewCard
                key={review.title}
                review={review}
              />
            );
          })}
      </div>
    </main>
  );
}
