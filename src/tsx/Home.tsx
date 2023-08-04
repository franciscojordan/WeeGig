import "../css/Home.css";

function Button(props): JSX.Element {
  let color;
  if (props.type == "green") {
    console.log(props.value + " IS GREEN");
    color = "button-green";
  } else {
    console.log(props.value + " IS NOT GREEN");
    color = "button-green-line";
  }

  return <button className={color}>{props.value}</button>;
}

function DivBox(props): JSX.Element {
  console.log(props);
  return (
    <>
      <div className="charts">
        <img src={props.img} alt="" />
        <h3>{props.title} </h3>
        <p>{props.content}</p>
        <a href={props.hrefcontent}>{props.subtitle}</a>
      </div>
    </>
  );
}

function Home() {
  return (
    <>
      <div className="container">
        <div>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          <Button value="Clic" type="green" />
          <Button value="Clic"></Button>
        </div>
        <div>
          <img src="./src/assets/img/initial.jpg" alt="" />
        </div>
      </div>
      <div className="containers">
        <div>
          <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
          <h2>
            <a href="">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </a>
          </h2>
          <div className="chart">
            <div className="charts">
              <DivBox
                img="./src/assets/img/2.jpeg"
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                hrefcontent="www.google.com"
              />
            </div>
            <div className="charts">
              <DivBox
                img="./src/assets/img/3.jpeg"
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                hrefcontent="www.google.com"
              />
            </div>
            <div className="charts">
              <DivBox
                img="./src/assets/img/4.jpeg"
                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                hrefcontent="www.google.com"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;