import { useContext } from "react";
import currencyFormatter from "../helpers/currencyFormatter";
import defaultPhoto from "../helpers/defaultPhoto";
import { navigationContext } from "./app";
import Bids from "./bidList";
import BidList from "./bidList";
import AddBid from "./addBid";
import LoadingIndicator from "./loadingIndicator";
import loadingStatus from "@/helpers/loadingStatus";
import useBids from "@/hooks/useBids";

const House = () => {
  const { param: house } = useContext(navigationContext)
  const { bids, loadingState, addBid } = useBids(house.id);

  if (loadingState !== loadingStatus.loaded) {
    return <LoadingIndicator loadingState={loadingState} />
  }

  return (
    <div className="row">
      <div className="col-6">
        <div className="row">
          <img
            className="img-fluid"
            src={
              house.photo ? `./houseImages/${house.photo}.jpeg` : defaultPhoto
            }
            alt="House pic"
          />
        </div>
      </div>
      <div className="col-6">
        <div className="row mt-2">
          <h5 className="col-12">{house.country}</h5>
        </div>
        <div className="row">
          <h3 className="col-12">{house.address}</h3>
        </div>
        <div className="row">
          <h2 className="themeFontColor col-12">
            {currencyFormatter.format(house.price)}
          </h2>
        </div>
        <div className="row">
          <div className="col-12 mt-3">{house.description}</div>
        </div>
        <BidList bids={bids} />
        <AddBid house={house} addBid={addBid} />
      </div>
    </div>
  );
};

export default House;
