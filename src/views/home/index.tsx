import Input from "../../components/input";
import "./styles.css";
import { FaPlus, FaTrash } from "react-icons/fa";

type HomeProps = {
  onSearch?: Function;
  showSearch: boolean;
  playlist: React.ReactNode;
  addSongs: Function;
  onDelete: Function;
  songs: any[];
  filteredSongs: any[];
};

const Home = ({
  onSearch,
  showSearch,
  playlist,
  addSongs,
  onDelete,
  songs,
  filteredSongs,
}: HomeProps) => {
  // const getIndex = (name: string) => {
  //   return songs.findIndex((s) => s.name.toLowerCase() === name.toLowerCase());
  // };
  const delete_all = () => {
    songs.map(({ name }: any, i: number) => {
      onDelete(i);
    });
  };

  return (
    <>
      {showSearch && (
        <div className="home__input d-flex w-100">
          <Input
            type="search"
            placeholder="Search"
            onChange={(e: string) => onSearch && onSearch(e)}
          />
          <div
            className="header__icon mt-2 ms-1"
            onClick={() => {
              addSongs();
            }}
          >
            {<FaPlus size={35} />}
          </div>
          <div
            className=" header__icon playlist__icon--right mt-2 ms-2"
            onClick={() => {
              delete_all();
            }}
          >
            <FaTrash size={30} />
          </div>
        </div>
      )}
      <div className="home mb-5 w-100">{playlist}</div>
    </>
  );
};

export default Home;
