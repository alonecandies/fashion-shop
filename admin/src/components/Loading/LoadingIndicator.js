import * as React from 'react';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ props }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        margin: 'auto',
        background: '0 0'
      }}
      width={100}
      height={100}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
      display="block"
      {...props}
    >
      <path fill="#5664d2" d="M19 19H39V39H19z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M40 19H60V39H40z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.10416666666666667s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M61 19H81V39H61z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.20833333333333334s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M19 40H39V60H19z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.7291666666666667s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M61 40H81V60H61z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.3125s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M19 61H39V81H19z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.625s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M40 61H60V81H40z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.5208333333333334s"
          calcMode="discrete"
        />
      </path>
      <path fill="#5664d2" d="M61 61H81V81H61z">
        <animate
          attributeName="fill"
          values="#505498;#5664d2;#5664d2"
          keyTimes="0;0.125;1"
          dur="0.8333333333333334s"
          repeatCount="indefinite"
          begin="0.4166666666666667s"
          calcMode="discrete"
        />
      </path>
    </svg>
  );
};

LoadingIndicator.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

export default LoadingIndicator;
