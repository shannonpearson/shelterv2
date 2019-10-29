import React from 'react';
import { Image } from 'react-bootstrap';

const Home = () => (
  <div className="container home-container">
    <div className="row home-row">
      <h1 className="page-header home-header">Mission</h1>
      <div className="col-12 home-text mission-text">
        {`Our goal is to find every animal that comes into our care a new, loving home. We care
          about each and every one and want to ensure that they are placed in great homes where they
          can live happy, healthy lives. The East Haven Animal Shelter works within the community to
          provide protection and care to stray, injured, and abused animals. The officers respond to
          calls regarding lost, injured, and neglected animals, both wild and domestic, and are
          often the first to provide them medical care and comfort. The Shelter provides a safe and
          comfortable environment for those stray, injured, and neglected animals while the owners
          are located or a new home is found. The Staff also works with other departments within the
          community to provide education in regards to day to day encounters with wildlife. It’s is
          also the departments responsibility to investigate all calls concerning animal cruelty. It
          is the staff's goal to continue to provide these services and enhance the quality of life
          for the residents and animals within the Town of East Haven.`}
      </div>
      <div className="row home-row home-image-row">
        <Image src="banner.jpg" />
      </div>
      <div className="row home-row">
        <div className="col-12 home-text details-text">
          {`The East Haven Animal Shelter is a municipal shelter serving the town of East Haven, CT.
          We are committed to helping all animals that come into our care, and adopting them out to
          loving homes. Unfortunately, we are not a no-kill shelter, but with the help of our
          compassionate Animal Control Officers and our volunteer group, we do everything within our
          power to ensure that an adoptable animal is not euthanized.`}
        </div>
      </div>
    </div>
  </div>
);

export default Home;
