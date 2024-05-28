import { useState } from "react";
import { useCurtains } from "react-curtains";
import { useLenis } from "@studio-freight/react-lenis";

const LenisCurtainsSync = ({ $isMobile }) => {
    const [curtainsRef, setCurtainsRef] = useState(null);
  
    useCurtains((curtains) => {
      setCurtainsRef(curtains);
    });
  
    useLenis(({ scroll }) => {
      if (curtainsRef === null) return;
      if ($isMobile) curtainsRef.updateScrollValues(0, scroll);
      else curtainsRef.updateScrollValues(scroll, 0);
    });
  };

  export default LenisCurtainsSync;