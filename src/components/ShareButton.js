import React from "react";
import "../styles/ShareButton.css";
import { IoShareOutline } from "react-icons/io5";

const ShareButton = (props) => {
  const { id } = props;
  const shareUrl = `https://furrl.in/productDetail?id=${id}`;

  const shareProduct = () => {
    if (navigator.share && navigator.canShare({ url: shareUrl })) {
      navigator.share({
        title: "Check out this product!",
        url: `https://furrl.in/productDetail?id=${id}`,
      });
    } else {
      const shareWindow = window.open(
        `https://www.twitter.com/share?url=${encodeURIComponent(shareUrl)}`,
        "share-popup",
        "width=600,height=400"
      );
      if (shareWindow) {
        shareWindow.focus();
      }
    }
  };

  return (
    <div>
      <button type="button" className="sharebtn" onClick={shareProduct}>
        <IoShareOutline className="shareicon" />
      </button>
    </div>
  );
};

export default ShareButton;
