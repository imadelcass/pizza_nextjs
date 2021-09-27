import styles from '../styles/Search.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/dist/client/router';
function Search() {
  const router = useRouter();
  return (
    <div className={styles.search}>
      <input
        placeholder='Search pizza ..'
        onChange={e =>
          router.push(
            `?search=${e.target.value}`
          )
        }
      />
      <div className={styles.search_icon}>
        <SearchIcon />
      </div>
    </div>
  );
}

export default Search;
