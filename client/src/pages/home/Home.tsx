import './Home.css'
import {
  PiNumberOneLight,
  PiNumberTwoLight,
  PiNumberThreeLight,
  BiConversation,
  BsFacebook,
  BsInstagram,
  BsTiktok,
  BsTwitter,
  BsYoutube
} from '../../utils/icons'
import { CodeInputForm, Navbar } from '../../components';
import { chatIcons, icons, socialIcon } from '../../utils/styles';

const Home = () => {
  return (
    <div className="bg">
      <Navbar />
      <div className="container home">
        <div className="shape"></div>
        <div className="shape-right"></div>
        <div className="hero">
          <div className="input-container">
            <CodeInputForm/>
          </div>
          <h1 className='typing-animation'>Amplify Every Voice, <span className='primary-color'>Inspire Meaningful <br></br> Connections</span> with Crowd Connect</h1>
          <div>
            <BiConversation style={chatIcons}/>
          </div>
        </div>
    {/* showcase */}
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
        <div className="social-icons">
            <div><BsFacebook style={socialIcon}/></div>
            <div><BsTiktok style={socialIcon}/></div>
            <div><BsTwitter style={socialIcon}/></div>
            <div><BsInstagram style={socialIcon}/></div>
            <div><BsYoutube style={socialIcon}/></div>
          </div>
      </div>
    </div>
  );
};

export default Home;
