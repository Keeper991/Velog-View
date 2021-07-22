import React from "react";
import _ from "lodash";

import Spinner from "../elements/Spinner";

const InfinityScroll = (props) => {
  const { children, callNext, isNext, loading } = props;

  const _handleScroll = _.throttle(() => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;

    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (scrollHeight - innerHeight - scrollTop < 600) {
      if (loading) {
        return;
      }

      callNext();
    }
  }, 300);

  const handleActions = React.useCallback(_handleScroll, [loading]);

  React.useEffect(() => {
    if (loading) {
      return;
    }

    if (isNext) {
      window.addEventListener("scroll", handleActions);
    } else {
      window.removeEventListener("scroll", handleActions);
    }

    return () => window.removeEventListener("scroll", handleActions);
  }, [isNext, loading]);

  return (
    <React.Fragment>
      {children}
      {isNext && <Spinner />}{" "}
    </React.Fragment>
  );
};

InfinityScroll.defaultProps = {
  children: null,
  callNext: () => {},
  isNext: false,
  loading: false,
};

export default InfinityScroll;
