import "../css/Home.css";

function Home () {
    return (
        <>
        <div className="container">
            <div>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button>ASD</button>
                <button>DSA</button>
            </div>
            <div>
                <img src="./src/assets/img/1.jpeg" alt="" />
            </div>
        </div>
        <div className="containers">
            <div>
                <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                <h2><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h2>
                <div className="chart">
                    <div className="charts">
                        <img src="./src/assets/img/2.jpeg" alt="" />
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <h4><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h4>
                    </div>
                    <div className="charts">
                    <img src="./src/assets/img/3.jpeg" alt="" />
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <h4><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h4>
                    </div>
                    <div className="charts">
                    <img src="./src/assets/img/4.jpeg" alt="" />
                        <h3>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <h4><a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit.</a></h4>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Home;