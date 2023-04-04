import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import React, { CSSProperties, FC, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

interface Props {
  onClick?(event?: React.MouseEvent<HTMLDivElement | HTMLButtonElement>): void;
  className?: string;
  blocked?: boolean;
  touchableProps?: React.HTMLAttributes<HTMLDivElement>;
  style?: CSSProperties;
  forList?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
}

export const TouchableOpacity: FC<Props> = ({
  onClick,
  className,
  children,
  blocked,
  touchableProps,
  style,
  forList,
  disabled,
}) => {
  const classes = useStyles();
  const [pressed, setPressed] = useState(false);
  const setPressedTimeout = useRef<TimeoutId | null>(null);

  const handlePointerDown = () => {
    if (forList) {
      setPressedTimeout.current = setTimeout(() => setPressed(true), 20);
    } else {
      setPressed(true);
    }
  };

  const handlePointerMove = () => {
    if (setPressedTimeout.current) clearTimeout(setPressedTimeout.current);
  };

  const unPress = () => {
    setPressed(false);
  };

  return (
    <div
      className={`${pressed ? classes.touchedContainer : classes.untouchedContainer} ${
        classes.container
      } ${className}`}
      style={style}
    >
      {children}
      {!disabled && (
        <div
          role="button"
          tabIndex={0}
          className={classes.touchable}
          onPointerDown={handlePointerDown}
          onPointerUp={unPress}
          onPointerOut={unPress}
          onMouseDown={handlePointerDown}
          onMouseUp={unPress}
          onMouseOut={unPress}
          onBlur={unPress}
          {...(forList ? { onPointerMove: handlePointerMove } : {})}
          {...touchableProps}
          {...(onClick && !blocked ? { onClick } : {})}
        />
      )}
    </div>
  );
};

const useStyles = createUseStyles({
  touchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'all',
    '-webkit-tap-highlight-color': 'transparent',
    cursor: 'pointer',
    touchAction: 'manipulation',
  },
  container: {
    position: 'relative',
    transition: 'opacity 0.2s ease',
    '-webkit-tap-highlight-color': 'transparent',
    touchAction: 'manipulation',
    cursor: 'not-allowed',
  },
  untouchedContainer: {
    opacity: 1,
  },
  touchedContainer: {
    opacity: 0.3,
    transition: 'none',
  },
});
