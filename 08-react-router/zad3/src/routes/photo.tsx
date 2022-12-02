import { Link, useNavigate, useParams } from 'react-router-dom';
import Stars from '../components/Stars';
import images from '../mock/data';
import isValidId from '../utils/isValidId';

const Photo = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const image = isValidId(id) ? images[parseInt(id!)] : undefined;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {!!image ? (
        <>
          <img src={image.url} height={500} width={500} />

          <p>average score: {image.rating}</p>

          <p>
            <Link to={`/${id}/desc`}>description</Link>
          </p>

          <Stars rating={image.rating} />

          <div>
            {parseInt(id!) !== 0 ? (
              <button onClick={() => navigate(`/${parseInt(id!) - 1}`)}>
                &lt;
              </button>
            ) : null}
            {parseInt(id!) !== 9 ? (
              <button onClick={() => navigate(`/${parseInt(id!) + 1}`)}>
                &gt;
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <h1>Id has to be a number between 0 and 9</h1>
      )}
    </div>
  );
};

export default Photo;
