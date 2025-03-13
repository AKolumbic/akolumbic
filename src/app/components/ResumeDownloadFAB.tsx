import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import {
  FABContainer,
  FABButton,
  FABTooltip,
} from "../styles/ResumeDownloadFAB.styles";
import { downloadResume } from "../utils/downloadResume";

const ResumeDownloadFAB: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <FABContainer>
      <FABButton
        onClick={downloadResume}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Download Resume"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <FiDownload />
      </FABButton>
      <AnimatePresence>
        {showTooltip && (
          <FABTooltip
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            Download My Resume
          </FABTooltip>
        )}
      </AnimatePresence>
    </FABContainer>
  );
};

export default ResumeDownloadFAB;
