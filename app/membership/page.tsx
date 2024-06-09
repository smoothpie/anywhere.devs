"use client";
import { useState } from 'react';
import s from './Membership.module.scss';

const MembershipPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  console.log(billingCycle)
  return (
    <div className={s.main}>
      <header className={s.header}>
        <h1>Become a member</h1>
        <p>Everything on the website is free. But hey, we're all busy people. Who wants to scroll through thousands of listings every time and then forget some incubator application deadline and then a year later see how your mom friend's son got into YCombinator?</p>
        
        <p>Yeah, not me.</p>
        {/* <p>An up-to-date searchable database of 1000+ opportunities and helpful resources for startup founders. Updated bi-weekly. Includes tools, articles, incubators, grants, country and industry specific opportunities, and lots more!</p> */}
      </header>
      <section className={s.cards}>
        <div className={s.card}>
          <h2>Free</h2>
          <p>Free access to all the resources.</p>
        </div>

        <div className={s.card}>
          <h2>Membership</h2>
          {billingCycle === 'monthly' ? (
            <div className={s.price}>
              <span onClick={() => setBillingCycle("monthly")}>$10/month</span>
              <span onClick={() => setBillingCycle("yearly")}>$100/year</span>
            </div>
          ) : (
            <div className={s.price}>
              <span onClick={() => setBillingCycle("yearly")}>$100/year</span>
              <span onClick={() => setBillingCycle("monthly")}>$10/month</span>
            </div>
          )}
          <ul>
            <li>Bi-weekly newsletter with a round-up of fresh opportunities and new website listings</li>
            <li>Access to our private Discord community</li>
          </ul>
          <p>* Next newsletter: Jan 28, 2023</p>
          <button>Become a member</button>
        </div>
      </section>
    </div>
  );
}

export default MembershipPage;