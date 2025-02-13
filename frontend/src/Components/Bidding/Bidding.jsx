import BiddingItems from "./BiddingItems";

const Bidding = () => {
  return (
    <div>
      <div className="p-4">
        <BiddingItems />
        <div className="py-3 shadow-md">
          <div className="bg-gray-100">
            <h1 className="font-semibold text-lg">Category List</h1>
          </div>
          <div>
            <label htmlFor="category" className="label">
              Category
            </label>
            <input type="text" className="input input-bordered" />
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Bidding;
