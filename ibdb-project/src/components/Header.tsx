import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import DownDrop from './DownDrop';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import LoginPopup from './LoginPopup';
import { MenuProps } from 'antd';
import ScrollIntoView from 'react-scroll-into-view';
import { auth } from '../firebaseControl';
import { User, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from "react-router-dom";
import { DarkModeContext } from './DarkModeHandler';


const Header = () => {

  const [filterClicked, setFilterClicked] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [visibleAddBook, setVisibleAddBook] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const { darkMode, setDarkMode } = useContext(DarkModeContext);
  const [divClass, setDivClass] = useState("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");
  const navigate = useNavigate();

  let admins: string[] = ['admin@gmail.com'];

  useEffect(() => {
    onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUser(user);
        if (user.email != null && admins.includes(user.email)) {
          setVisibleAddBook(true);
        } else {
          setVisibleAddBook(false);
        }
      } else {
        setUser(null);
        setVisibleAddBook(false);
      }
    });
  }, []);

  const hideFilter = () => {
    setFilterClicked(false);
    setDivClass("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");
  }

  const showFilter = () => {
    setFilterClicked(true);
    setDivClass("sticky top-0 z-30 navbar navbar-expand-lg py-5 px-10 relative bg-bigBoy");
  }

  const listView = () => {
    navigate(`/`); 
    setFilterClicked(false);
    setDivClass("sticky top-0 z-30 navbar navbar-expand-lg shadow-md py-5 px-10 relative bg-bigBoy");
  }

  const lists: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <ScrollIntoView className="menu-choice" onClick={() => listView()} selector="#recentlyReleased">
          <button>
            Recently Released
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '2',
      label: (
        <ScrollIntoView onClick={() => listView()} selector="#comingSoon">
          <button className="menu-choice">
            Coming Soon
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '3',
      label: (
        <ScrollIntoView onClick={() => listView()} selector="#topBooks">
          <button className="menu-choice">
            Top Books
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '4',
      label: (
        <ScrollIntoView onClick={() => listView()} selector="#RATI">
          <button className="menu-choice">
            Recently added to IBDb
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '5',
      label: (
        <ScrollIntoView onClick={() => listView()} selector="#RATI">
          <button className="menu-choice">
            My Rated Books
          </button>
        </ScrollIntoView>
      ),
    },
    {
      key: '6',
      label: (
        <ScrollIntoView onClick={() => listView()} selector="">
          <button className="menu-choice">
            My Custom List 1
          </button>
        </ScrollIntoView>
      ),
    },
  ];

  const profile: MenuProps['items'] = [
    {
      key: '1',
      label: user ?
      <div>
        <button className="menu-choice w-full" onClick={() => signOut(auth)}>
          Sign Out
        </button >
        <p className='user-email'>
          {user.email}
        </p>
      </div>
        : <button className="menu-choice w-full" onClick= {() => {setPopupVisible(true)}}>
          Sign in
        </button>,
    },
    {
      key: '2',
      label: <input className="toggle" type="checkbox" checked={darkMode} onClick={(e) => e.stopPropagation()} onChange={(e) => {setDarkMode(e.target.checked)}}/>,
    },
  ];

  return (
    < div className={divClass} >
      <div className="flex items-center w-full justify-between">
        <button onClick={hideFilter}>
          <Link to="/" className="link px-5 py-2 rounded-lg bg-kulTheme dark:hover:bg-teitThene font-serif text-4xl shadow-0 hover:shadow-lg " >IBDb</Link>
        </button>
        <DownDrop items={lists} text='Menu' />
        <SearchBar />
        <button>
          {!filterClicked ?
            <Link to="/filteredBooks" onClick={showFilter} className="header-button px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" >Show Filter</Link>
            : null
          }
        </button>
        {visibleAddBook ?
          <button className="header-button px-6 py-3 rounded-xl bg-hvit shadow-0 hover:shadow-lg" onClick={() => { navigate(`/addBook`); setFilterClicked(false) }}> Add Book</button>
          : null}
        <div>
          <DownDrop items={profile} text='Profile' />
        </div>
        <LoginPopup visible={popupVisible} setVisible={setPopupVisible}/>
      </div>
    </div>)
}

export default Header;

