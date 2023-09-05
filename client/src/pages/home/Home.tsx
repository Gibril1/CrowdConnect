import './Home.css'
import {PiNumberOneLight, PiNumberTwoLight, PiNumberThreeLight} from 'react-icons/pi'
import {BiConversation} from 'react-icons/bi'
import { CodeInputForm, Navbar } from '../../components';


const Home = () => {
  // style icons
  let icons = { border: '1px solid #3b3355', fontSize: '50px', borderRadius: '50%', padding: '15px'}
  return (
    <div className="bg-white">
      <Navbar />
      <div className="container">
        <div className="hero">
          <h1>Amplify Every Voice, Inspire Meaningful<br></br><span className="align-center mr-1">Connections with Crowd Connect</span><BiConversation/></h1>
        </div>
        <div className="input-container">
          <CodeInputForm/>
        </div>
        <div className="showcase">
          <div className="section">
            <div className="section-icon">
              <PiNumberOneLight style={icons}/>
            </div>
            <div className="section-text">
            <h1>Start A Conversation</h1>
            <p>Unlock the power of your voice with Crowd Connect. Seamlessly contribute and share your thoughts, making every event an opportunity for meaningful exchange.</p>
            </div>
          </div>
          <div className="section">
            <div className="section-icon">
              <PiNumberTwoLight style={icons}/>
            </div>
            <div className="section-text">
            <h1 className="align-center">Foster Inclusivity</h1>
            <p className="align-center">Connect with fellow attendees through Crowd Connect's unique 6-digit code. Anonymously express your ideas, creating a diverse and vibrant dialogue that enriches every event experience.</p>
            </div>
          </div>
          <div className="section">
            <div className="section-icon">
              <PiNumberThreeLight style={icons}/>
            </div>
            <div className="section-text">
            <h1>Shape Conversations</h1>
            <p>Your voice matters. Crowd Connect empowers you to shape discussions and contribute to impactful conversations. Join us in transforming events into collaborative platforms for change.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
