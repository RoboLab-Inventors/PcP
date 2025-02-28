import { Typography } from "@mui/material";
import "./ExplanationSection.css";

const ExplanationSection = () => {
  return (
    <>
      <div className="homeSeparator"></div>
      <div className="explanationContainer">
        <div className="explanationVideo">
          <div className="videoCard">
            <div className="videoWrapper">
              <iframe
                src="https://www.youtube.com/embed/Sagg08DrO5U?si=RJtQZOYknxbU5zGF"
                title="PCP Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>
        <div className="explanationText">
          <Typography variant="h2" color="white" className="explanationTitle">
            Cosa offre PCP?
          </Typography>
          <Typography variant="p" className="explanationDescription">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?
          </Typography>
        </div>
      </div>
    </>
  );
};

export default ExplanationSection;
