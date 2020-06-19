import { NavOptions, createAnimation, Animation } from '@ionic/core';

interface TransitionOptions extends NavOptions {
  progressCallback?: (ani: Animation | undefined) => void;
  baseEl: any;
  enteringEl: HTMLElement;
  leavingEl: HTMLElement | undefined;
}

const getIonPageElement = (element) => {
  if (element.classList.contains('ion-page')) {
    return element;
  }
  const ionPage = element.querySelector(':scope > .ion-page, :scope > ion-nav, :scope > ion-tabs');
  if (ionPage) {
    return ionPage;
  }
  // idk, return the original element so at least something animates and we don't have a null pointer
  return element;
};

export function slideTransition(_: HTMLElement, opts: TransitionOptions) {

  // root animation with common setup for the whole transition
  const rootTransition = createAnimation()
    .duration(540)
    .easing('cubic-bezier(0.32,0.72,0,1)');

  // ensure that the entering page is visible from the start of the transition
  const enteringPage = createAnimation()
    .addElement(getIonPageElement(opts.enteringEl))
    .beforeRemoveClass('ion-page-invisible');

  // create animation for the leaving page
  const leavingPage = createAnimation()
    .addElement(getIonPageElement(opts.leavingEl));

  // actual customized animation
  if (opts.direction === 'forward') {
    enteringPage
      .fromTo('transform', 'translateX(100%)', 'translateX(0)')
      .beforeStyles({ 'box-shadow': '0px 0px 20px 0px rgba(0,0,0,0.2)' });
    // leavingPage
    //   .fromTo('transform', `translateX(0)`, `translateX(-33%)`);
  } else {
    leavingPage
      .fromTo('transform', 'translateX(0)', 'translateX(100%)')
      .beforeStyles({ 'box-shadow': '0px 0px 20px 0px rgba(0,0,0,0.2)' });
    // enteringPage
    //   .fromTo('transform', `translateX(-33%)`, `translateX(0)`);
  }

  // include animations for both pages into the root animation
  rootTransition.addAnimation(enteringPage);
  rootTransition.addAnimation(leavingPage);
  return rootTransition;
}
