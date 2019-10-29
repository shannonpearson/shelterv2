/* eslint-disable quotes */
/* eslint-disable react/jsx-curly-brace-presence */
import React, { useState } from 'react';
import { Form, Image } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input';

import Checkout from './Checkout';

function Donate() {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (event, maskedValue, floatValue) => {
    setAmount(floatValue);
  };

  return (
    <div className="container donate-container">
      <div className="row donate-intro">
        Thank you so much for considering a donation to the East Haven Animal Shelter. Your
        donations ehable us to provide the best medical care to our sick or injured animals, giving
        them a second chance at finding a forever home.
      </div>
      <div className="row donation-row">
        <Form className="donation-form">
          <Form.Group>
            <Form.Label> Donation Amount: </Form.Label>
            <CurrencyInput
              value={amount}
              onChangeEvent={handleAmountChange}
              prefix="$"
              className="form-control"
            />
          </Form.Group>
        </Form>
        <Checkout
          name="East Haven Animal Shelter"
          description="Donate"
          amount={amount}
          panelLabel="Donate"
          closed={() => setAmount(0)}
          className="col-6 col-sm-2 checkout"
        />
      </div>
      <div className="row donations-info-row">
        <h4>Where will my donations go?</h4>
        <p className="donation-paragraph">
          There are consistent costs associated with the care of the dogs, cats, and any other
          animals that come into the shelter. These include food, bedding, toys, cleaning materials,
          and medical care.
        </p>
        <p className="donation-paragraph">
          There are additional practices we would like put in place on a regular basis, as well as
          several bigger one-time projects we would like to undertake, in order to improve the
          quality of care for our animals.
        </p>
        <p className="donation-paragraph">
          {` The first thing on our wish list is the ability to have a trainer come to the shelter on a
          weekly basis. Some animals that come into our care spend months here with us. A dog that
          walks well on a leash and understands commands such as "sit", "stay", and "off" as a much
          better chance of being adopted and staying in that home. A consistent program to teach all
          of our dogs to perform basic tasks will be instrumental in placing them in good homes.`}
        </p>
        <p className="donation-paragraph">
          The second thing we would like is as soon as we comfortable with handling a dog is to get
          them groomed. A well-groomed dog looking his/her best will catch the eye of potential
          adopters and allow his/her personality to shine!
        </p>
        <p className="donation-paragraph">
          Finally, we would like to remove the wire and chain link dividers on the inside portion of
          the kennels and install a solid waterproof and soundproof divider wall. Every dog deserves
          a place to can go to where it is quiet and where they can feel safe!
        </p>
      </div>
      <div className="row story-row">
        <h4>{`Tux's Story`}</h4>
        <p className="story-paragraph">
          Recently, donations provided medical treatment for Tux, a five year old Cocker Spaniel,
          who was found in very poor condition. Tux had been extremely neglected by his previous
          owner and tossed on the street to fend for himself. He required surgery for an untreated
          open leg wound. He was put on antibiotics because his eyes and ears were so badly infected
          that he could barely see or hear, making him appear to be much older than he actually was.
          Sadly, Tux also tested positive for heartworm disease, a condition that is easily
          prevented, but once contracted, very costly and risky to treat, and fatal if left
          untreated.
        </p>
        <Image src="tux.png" className="tux" />
        <p className="story-paragraph">
          Tux survived the series of heartworm treatments and recovered physically and emotionally
          from his sad past. We are happy to report that he has since been adopted and is now a
          cherished family member!
        </p>
        <p className="-story-paragraph">
          {`Sadly, stories like Tux's are not uncommon. Your kindness and generosity give us the
          opportunity to transform Tux's life into the one he deserves. Thank you!`}
        </p>
      </div>
    </div>
  );
}

export default Donate;
