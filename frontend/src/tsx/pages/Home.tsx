import "../../css/pages/Home.css";

function Button(props): JSX.Element {
    let color;
    if (props.type == "green") {
        color = "button-green";
    } else {
        color = "button-green-line";
    }
    return <button className={color}>{props.value}</button>;
}

function DivBox(props): JSX.Element {
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
                    <h1 className="big">¡Bienvenidos a WEE GIG!</h1>
                    <p>En WEE GIG, nos enorgullece ser un puente entre individuos comprometidos y apasionados por hacer una diferencia en el mundo y oportunidades de trabajo en el ámbito de la beneficencia.</p>
                    <a href="/registrar"><Button href='/register' value="Crear Cuenta" type="green" /></a>
                    <a href="/Login"><Button href='/login' value="Iniciar Sesion" /></a>
                </div>
                <div className="leftimg">
                    <img src="./src/assets/img/initial.jpg" alt="" />
                </div>
            </div>
            <div className="containers">
                <div>
                    <h1 className="textmarg">Descubre todo lo que ofrece WEE GIG</h1>
                    <h2>
                        <a href="">
                            Para mayor información no dude en ponerse en contacto con nosotros.                        
                        </a>
                    </h2>
                    <div className="chart">
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/2.jpg"
                                title="Descubre Oportunidades de Voluntariado"
                                content="Explora nuestras diversas oportunidades de voluntariado y únete a proyectos inspiradores que impactan positivamente en comunidades vulnerables."
                                subtitle="Explorar Oportunidades"
                                hrefcontent="www.google.com"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/3.jpg"
                                title="Empleo con Propósito Solidario"
                                content="¿Buscas un trabajo que vaya más allá de las ganancias? Explora nuestras ofertas laborales en el sector de beneficencia y únete a equipos comprometidos con un propósito."
                                subtitle="Ver Ofertas de Empleo"
                                hrefcontent="./Ofertas"
                            />
                        </div>
                        <div className="charts">
                            <DivBox
                                img="./src/assets/img/4.jpg"
                                title="Colabora en Proyectos Benéficos Innovadores"
                                content="Si tienes habilidades específicas, ¡puedes hacer una diferencia aún mayor! Únete a proyectos benéficos innovadores que buscan mentes creativas en diseño, tecnología, investigación y más."
                                subtitle="Explorar Colaboraciones"
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
