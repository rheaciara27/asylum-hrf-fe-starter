import pieChart from '../../../assets/pie-chart.png';
import lineGraph from '../../../assets/line-graph.png';
import barGraph from '../../../assets/bar-graph.png';
import paperStack from '../../../assets/paper-stack.jpg';
import { useNavigate } from 'react-router-dom';
import { useDownloadData } from '../../../hooks/useDownloadData.js';
// import { decodeBase64 } from '../../../utils/decodeBase64.js'; - this doesn't seem needed, yet, but leaving in case.

export const LandingPage = () => {
  const navigate = useNavigate();
  const { downloadCSV } = useDownloadData();

  const scrollToTop = () => {
    let scrollStep = -window.scrollY / 25; // calculates the number of pixels to scroll during each interval, higher = slower.
    let scrollInterval = setInterval(() => {
      if (window.scrollY === 0) {
        clearInterval(scrollInterval);
      } else {
        window.scrollBy(0, scrollStep);
      }
    }, 15); // how often the function runs in ms, higher runs less-frequently, lower is more smooth.
  };

  const handleReadMore = () => {
    // navigate to the Human Rights First Organization's home page in a new tab.
    window.open('https://humanrightsfirst.org', '_blank');
  };

  // a card component to create the images and titles with styling.
  const ImageCard = ({ src, alt, title, imgClassName }) => (
    <div className='flex-c gap-3'>
      <img src={src} alt={alt} className={imgClassName} />
      <h3>{title}</h3>
    </div>
  );
  // An insight card component for the insight's section with styling.
  const InsightCard = ({ value, description }) => (
    <div className='flex-c-1 gap-12'>
      <div className='insights-details-header'>
        <h3 className='text-4xl'>{value}</h3>
      </div>
      <div className='insights-details-content'>
        <p className='text-lg'>{description}</p>
      </div>
    </div>
  );
  // Create buttons with a uniform look via this component.
  const Button = ({ onClick, children, className }) => (
    <button onClick={onClick} className={`bg-[#aaa] px-[10px] py-[5px] text-white text-md font-semibold ${className}`}>
      {children}
    </button>
  );

  return (
    // the parent div
    <div className='flex-c w-[100vw] secondary-c'> 
      {/* the top section */}
      <section className='primary-c flex pt-4 pb-8'>
        <div className='flex-c mx-auto'>
          <h1 className='text-6xl mb-8 text-white'>Asylum Office Grant Rate Tracker</h1>
          <h3 className='text-white'>
            The Asylum Office Grant Rate Tracker provides asylum seekers, researchers, policymakers, and the public an interactive tool to explore USCIS data on
            Asylum Office decisions.
          </h3>
        </div>
      </section>
      {/* the graph's section */}
      <section className='flex-c pt-10'>
        <div className='flex-c'>
          <div className='flex justify-center m-14 gap-20 text-2xl'>
            <ImageCard src={barGraph} alt='Bar Graph' title='Search Grant Rates By Office' imgClassName='h-[300px] w-[500px]' />
            <ImageCard src={pieChart} alt='Pie Chart' title='Search Grant Rates By Nationality' imgClassName='h-[300px] object-contain' />
            <ImageCard src={lineGraph} alt='Line Graph' title='Search Grant Rates Over Time' imgClassName='h-[300px] w-[500px]' />
          </div>
          <div className='flex align-center mx-auto gap-8'>
            <Button onClick={() => navigate('/graphs')}>View the Data</Button>
            <Button onClick={downloadCSV}>Download the Data</Button>
          </div>
        </div>
      </section>
      {/* the middle section */}
      <section className='flex'>
        <div className='flex-1 content-center p-20'>
          <img src={paperStack} alt='Human Rights First' className='rounded-2xl h-[70%] w-[100%]' />
        </div>
        <div className='flex-1 content-center p-20'>
          <p className='text-xl'>
            Human Rights First has created a search tool to give you a user-friendly way to explore a data set of asylum decisions between FY 2016 and May 2021
            by the USCIS Asylum Office, which we received through a Freedom of Information Act request. You can search for information on asylum grant rates by
            year, nationality, and asylum office, visualize the data with charts and heat maps, and download the data set.
          </p>
        </div>
      </section>
      {/* The bottom, insights section. */}
      <section className='flex-c gap-16'>
        <div>
          <h3 className='text-5xl'>Systemic Disparity Insights</h3>
        </div>
        <div className='flex justify-center m-14 gap-20 text-2xl'>
          <InsightCard
            value='36%'
            description='By the end of the Trump administration, the average asylum office grant rate had fallen 36% from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 20202.'
          />
          <InsightCard value='5%' description='The New York asylum office grant rate dropped to 5 percent in fiscal year 2020.' />
          <InsightCard
            value='6x Lower'
            description="Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was 6 times lower than the San Francisco asylum office."
          />
        </div>
      </section>
      <section>
        <Button onClick={handleReadMore} className='primary-c text-white px-4 py-2'>
          Read More
        </Button>
      </section>
      <section className='p-16'>
        <button className='font-medium' onClick={scrollToTop}>
          Back To Top ^
        </button>
      </section>
    </div>
  );
};
