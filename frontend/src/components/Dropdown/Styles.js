import styled from 'styled-components';
import SearchIcon from '../../assets/images/search.svg';

const Container = styled.div`
  margin-top: 5em;
  margin-bottom: 4em;
  position: relative;
  left: 50%;
  transform: translate(-50%, -10%);
  z-index: 1000;
`;

const Search = styled.input`
  padding: 0.5em;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #504d8f;
  font-size: 1.5rem;
  background-color: #58549c;
  color: white;
  background-image: url(${SearchIcon});
  background-repeat: no-repeat;
  padding-left: 50px;
  background-size: 1.4rem;
  background-position: 0.5em 0.79em;

  ::placeholder {
    font-size: 1.5rem;
    color: white;
  }

  :active, :focus {
    outline: none;
  }
`;

const Content = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  text-align: left;
  margin-top: 5px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);

  .dropdown-item {
    color: black;
    padding: 12px 16px;
    background-color: white;
    cursor: pointer;

    :hover {
      background-color: #FA6060;
      color: white;
    }
  }

  .dropdown-item:first-child {
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
  }

  .dropdown-item:last-child {
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

export {
  Container,
  Search,
  Content,
};