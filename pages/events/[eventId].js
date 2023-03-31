import { Fragment } from 'react';

import { getEventById, getAllEvents } from '../../helpers/api-util';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';

function EventDetailPage(props) {
  const { selectedEvent } = props;

  const event = selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export const getStaticProps = async context => {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
  };
};

export const getStaticPaths = async () => {
  const events = await getAllEvents();

  const paths = events.map(event => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: false,
  };
};

export default EventDetailPage;
