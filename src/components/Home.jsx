import { Link } from "react-router-dom";
import cakeImage from "../assets/pexels-ronmar-lacamiento-806363.jpg";

const Home = () => {
  return (
    <div className="container home">
      <div className="header">
        <div className="text">
          <h1>Fresh from the oven.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            faucibus urna, ultricies rutrum quam. Maecenas dolor diam, commodo
            quis dui ac, vulputate faucibus augue. Nam pretium euismod neque ut
            consectetur. Sed a consectetur est. Nunc nunc ipsum, ultricies
            bibendum pulvinar a, ultricies vel sapien.
          </p>
          <Link to="/products">Explore</Link>
        </div>
        <img src={cakeImage} alt="cake"></img>
      </div>
      <div className="about" id="about">
        <img src={cakeImage} alt="cake" loading="lazy"></img>
        <div className="text">
          <h1>About Us</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed et
            faucibus urna, ultricies rutrum quam. Maecenas dolor diam, commodo
            quis dui ac, vulputate faucibus augue. Nam pretium euismod neque ut
            consectetur. Sed a consectetur est. Nunc nunc ipsum, ultricies
            bibendum pulvinar a, ultricies vel sapien. Mauris maximus tortor a
            ornare molestie. Curabitur tincidunt porta elit id finibus. Proin
            viverra rutrum quam id aliquet. Duis consectetur tempor porttitor
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
