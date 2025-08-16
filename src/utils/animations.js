import { Animated, Easing } from 'react-native';

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 250,
  slow: 400,
};

export const EASING_FUNCTIONS = {
  easeOut: Easing.out(Easing.quad),
  easeIn: Easing.in(Easing.quad),
  easeInOut: Easing.inOut(Easing.quad),
  spring: Easing.elastic(1.3),
};

export const createFadeAnimation = (animatedValue, toValue, duration = ANIMATION_DURATIONS.normal) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: EASING_FUNCTIONS.easeOut,
    useNativeDriver: true,
  });
};

export const createSlideAnimation = (animatedValue, toValue, duration = ANIMATION_DURATIONS.normal) => {
  return Animated.timing(animatedValue, {
    toValue,
    duration,
    easing: EASING_FUNCTIONS.easeOut,
    useNativeDriver: true,
  });
};

export const createScaleAnimation = (animatedValue, toValue, duration = ANIMATION_DURATIONS.normal) => {
  return Animated.spring(animatedValue, {
    toValue,
    tension: 100,
    friction: 8,
    useNativeDriver: true,
  });
};

export const createStaggeredAnimation = (animations, staggerDelay = 100) => {
  return Animated.stagger(staggerDelay, animations);
};

export const createSequenceAnimation = (animations) => {
  return Animated.sequence(animations);
};

export const createParallelAnimation = (animations) => {
  return Animated.parallel(animations);
};