import { getFeaturedEvents } from '../helpers/api-util';
import EventList from '../components/events/event-list';

function HomePage(props) {
  const { events } = props;

  return (
    <div>
      <EventList items={events} />
    </div>
  );
}

export const getStaticProps = async context => {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
};

export default HomePage;
