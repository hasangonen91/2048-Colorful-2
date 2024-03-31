export const useSwipe = (onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown) => {
    let firstTouchX = 0;
    let firstTouchY = 0;
  
    const onTouchStart = (e) => {
      firstTouchX = e.nativeEvent.pageX;
      firstTouchY = e.nativeEvent.pageY;
      return true;
    };
  
    const onTouchEnd = (e) => {
      const positionX = e.nativeEvent.pageX;
      const positionY = e.nativeEvent.pageY;
  
      if (Math.abs(positionX - firstTouchX) > Math.abs(positionY - firstTouchY)) {
        if (firstTouchX - positionX > 0) {
          onSwipeLeft();
        }
  
        if (positionX - firstTouchX > 0) {
          onSwipeRight();
        }
      } else if (
        Math.abs(positionX - firstTouchX) < Math.abs(positionY - firstTouchY)
      ) {
        if (firstTouchY - positionY > 0) {
          onSwipeUp();
        }
  
        if (positionY - firstTouchY > 0) {
          onSwipeDown();
        }
      }
    };
    return [onTouchStart, onTouchEnd];
  };