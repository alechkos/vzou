import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

import DsCardModal from "./DsCardModal";
import ExpendedCardItems from "./ExpendedCardItems";

export interface ExpendedItem {
  name: string;
  url: string;
}

interface Props {
  title: string;
  image: string;
  gif?: string;
  url: string;
  description?: string;
  expended?: boolean;
  expendedList?: ExpendedItem[];
}

function DsCard({ title, image, url, description, gif, expended, expendedList }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleOnClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <AnimatePresence>{isOpen && <DsCardModal onClick={handleOnClick} />}</AnimatePresence>

      <motion.div
        className="self-start hover:bg-lime-200 shadow-xl hover:shadow-none cursor-pointer w-80 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 ease-in-out bg-lime-100"
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        initial={{ zIndex: 0 }}
        animate={isOpen ? { zIndex: 2, scale: 1.3, transition: { duration: 0.3 } } : {}}
        onClick={
          expended
            ? () => {
                setIsOpen(!isOpen);
              }
            : () => {}
        }
      >
        <div className="relative mt-2 mx-2">
          <div className="h-56 rounded-2xl overflow-hidden">
            <Link to={url}>
              {isHovering || isOpen ? (
                <img
                  src={gif}
                  className="object-cover w-full h-full"
                  alt={title}
                />
              ) : (
                <img
                  src={image}
                  className="object-cover w-full h-full"
                  alt={title}
                />
              )}
            </Link>
          </div>
        </div>
        <div className="pt-8 pb-6 w-full px-4;">
          <h1 className="font-medium leading-none text-base tracking-wider text-black">{title}</h1>
          {description && !isOpen && (
            <motion.h1
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="text-gray-700 text-base "
            >
              {description}
            </motion.h1>
          )}
          {isOpen && <ExpendedCardItems list={expendedList} />}
        </div>
      </motion.div>
    </>
  );
}

export default DsCard;
