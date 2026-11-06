type MotionHost = Element & { motionInstance?: { leave: (done?: () => void) => Promise<void> | void } };

/** `<Transition :css="false" @leave="onMotionLeave">`: espera a variante `leave` do v-motion antes de remover o elemento. */
export function onMotionLeave(el: Element, done: () => void) {
  const motion = (el as MotionHost).motionInstance;
  if (motion) void motion.leave(done);
  else done();
}
