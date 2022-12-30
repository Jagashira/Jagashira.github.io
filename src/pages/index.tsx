import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Profile from "../components/Profile"

export default function Home(): JSX.Element {
  const { } = useDocusaurusContext();
  return (
    <Layout>
      <main>
        <Profile />
      </main>
    </Layout>
  );
}