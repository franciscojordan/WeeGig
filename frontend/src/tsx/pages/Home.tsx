import "../../css/pages/Home.css";

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
                <div className="maxw">
                    <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos voluptatem inventore provident, pariatur debitis, qui veritatis a itaque voluptatibus expedita molestias culpa soluta adipisci, obcaecati eos quae fugiat amet corrupti? Quam nisi quae, tempora dolorem reprehenderit nihil labore magnam minima. Sed error, qui officia animi nostrum ratione, porro similique nemo natus magnam est nulla recusandae exercitationem? Doloribus libero, aperiam, quia ratione corporis quibusdam, aliquam laboriosam velit obcaecati eveniet quo iusto necessitatibus nesciunt qui temporibus quisquam cupiditate autem? Veritatis vitae, tempora facere temporibus saepe explicabo id illum aut nam non dolorum vel nesciunt excepturi voluptates quasi animi incidunt! Accusantium, dolorem totam.</p>
                    <Button value="Clic" type="green" />
                    <Button value="Clic"></Button>
                </div>
                <div className="leftimg">
                    <img src="./src/assets/img/initial.jpg" alt="" />
                </div>
            </div>
            <div className="containers">
                <div>
                    <h1 className="textmarg">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h1>
                    <h2>
                        <a href="">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </a>
                    </h2>
                    <div className="chart">
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/2.jpg"
                                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                hrefcontent="www.google.com"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/3.jpg"
                                title="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                content="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit."
                                hrefcontent="www.google.com"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/4.jpg"
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
