import React, { PureComponent } from 'react';
import { Card, Spinner, Modal } from 'react-bootstrap';
import { unauthenticatedFetch } from '../../utils/fetchUtils';
import PetCard from './PetCard';

export default class AdoptContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      pets: [],
      loading: true,
      viewIndex: -1,
    };
  }

  componentDidMount() {
    return unauthenticatedFetch('/pets/all')
      .then(({ pets }) => this.setState({ pets, loading: false }));
  }

  _renderPanel = () => (
    <Card>
      <Card.Header as="h5">
          Frequently Asked Questions
      </Card.Header>
      <Card.Body>
        <p>
              To adopt an animal, you will need to fill out an application which must then be
              approved by a member of our staff.
              If you already have another dog, we encourage you to bring it with you to meet the
              animal you are interested in. We have areas set up at the shelter to introduce dogs
              and see how they get along together.
              Please note, animals are not adopted on a first come, first serve basis. We need to
              make sure it will be the best match for both you and the animal.
        </p>
        <p>
              If the animal is not already spayed and neutered, the adoption fee is $196,
              which includes spay/neuter, vaccinations, heartworm test (for dogs), FeLV/FIV test
              (for cats), and microchipping. We DO NOT make a profit from this, we only charge back
              what the vet charges us. Our main concern is that we are not adopting any animals out
              that can reproduce and contribute to the overwhelming overpopulation problem.
              The adoption fee for animals that are already spayed/neutered is $5.
        </p>
        <p>
              We are open from 8am-3pm, Mon through Sat.
              If you are interested in a pet, the best thing to do during the week is
              call the shelter at 203-468-3249 and set up an appointment to see an animal.
              There are usually volunteers at the shelter on Saturdays who can help you if you want
              to drop in.
        </p>
      </Card.Body>
    </Card>
  )

  handleCardClick = (index) => this.setState({ viewIndex: index })

  _renderPetPanels = (pets) => (
    <>
      { pets.map((pet, index) => (
        <PetCard pet={pet} key={pet._id} onClick={() => this.handleCardClick(index)} isPreview />
      ))}
      <div className="pets-intro">
        Please contact us for the most up-to-date information on pets currently in the shelter.
      </div>
    </>
  )

  _renderNoPets = () => (
    <div className="no-pets-section">
        No information available on pets currently in the shelter.
        Please contact the shelter for more information.
    </div>
  )

  render() {
    const { pets, loading, viewIndex } = this.state;
    return (
      <div className="container adopt-container">
        <div className="pets-section col-xs-12 col-sm-8">
          {!!loading && (
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
          )}
          {!loading && (pets.length ? this._renderPetPanels(pets) : this._renderNoPets())}
        </div>
        <div className="faq-panel col-xs-12 col-sm-4 pull-right">
          {this._renderPanel()}
        </div>
        <Modal className="pet-info-modal" show={viewIndex > -1} onHide={() => this.setState({ viewIndex: -1 })}>
          <Modal.Body>
            <PetCard pet={pets[viewIndex]} isPreview={false} />
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
