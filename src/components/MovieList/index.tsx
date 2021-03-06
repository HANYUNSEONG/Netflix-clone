import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row } from 'antd';

import { loadMovieData } from '../../actions/movie';
import { loadGenresData } from '../../actions/genres';
import { RootState } from '../../reducers';
import Movie from '../../components/Movie';

const MovieList:React.FC<any> = () => {
  const dispatch = useDispatch();
  let n = 1;

  const infiniteScroll = () => {
    let { clientHeight, scrollTop, scrollHeight } = document.documentElement;
    if(scrollHeight <= (clientHeight + scrollTop)) {
      n += 1;
      dispatch(loadMovieData(n));
    }
  }

  useEffect(() => {
    dispatch(loadMovieData());
    dispatch(loadGenresData());

    window.addEventListener('scroll', infiniteScroll);
  }, []);

  const { movieData, genresData } = useSelector((state: RootState) => {
    return {
      movieData: state.movie.movieData as [],
      genresData: state.genres.genresData as any,
    }
  });
  
  return (
    <Row gutter={[16, 16]} className="antd_grid_custom">
        {
          movieData && movieData.map((data: any, idx: any) =>
            <Movie
              key={idx}
              {...data}
            />
          )
        }
    </Row>
  )
}

export default MovieList;