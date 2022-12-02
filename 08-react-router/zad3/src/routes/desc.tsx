import { useNavigate, useParams } from 'react-router-dom';
import images from '../mock/data';
import isValidId from '../utils/isValidId';

const Desc = () => {
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
          <p>{image.desc}</p>
          <button onClick={() => navigate(`/${id}`)}>back</button>
        </>
      ) : (
        <h1>Id has to be a number between 0 and 9</h1>
      )}
    </div>
  );
};

export default Desc;
