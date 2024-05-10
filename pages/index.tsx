import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import { NextPage } from 'next';
import { VscFeedback } from 'react-icons/vsc';
import { AiOutlineShareAlt } from 'react-icons/ai';
import Header from '../components/home/Header';
import styles from '../styles/header.module.scss';
import MapSection from '../components/home/MapSection';
import { Store } from '../types/store';
import useStores from '../hooks/useStores';
import DetailSection from '@/components/home/DetailSection';

interface Props {
  stores: Store[];
}

const Home: NextPage<Props> = ({ stores }) => {
//  console.log(stores);
  const { initializeStores } = useStores();

  useEffect(() => {
    initializeStores(stores);
  }, [initializeStores, stores]); // 새로운 매장 데이터 들어오면, 그 매장 데이터로 전역 상태 업데이트

  return (
    <Fragment>
      <Header/>
      <main style={{position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
        <MapSection />
        <DetailSection />
      </main>
    </Fragment>
  );
};
export default Home;

export async function getStaticProps() {
  /** TODO: next api routes로 불러오기 */
  const stores = (await import('../public/stores.json')).default;

  return {
    props: { stores },
    revalidate: 60 * 60,
  };
}
