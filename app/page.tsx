'use client'
import { useState } from "react";
import Form from "./components/form";
import styles from "./page.module.css";

export default function Home() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((prevCount) => prevCount + 1);
  }
  return (
    <div className={styles.container}>
      <h1>More Dogs With Jobs</h1>
      <p>{count} signatures</p>
      <p>We believe that dogs should be allowed to work in spätis! Help us make this happen by adding your name to our petition. 100,000 names and the Berlin Senat will be forced to hear our demands</p>
      <Form increaseCount={increaseCount} />
    </div>
  );
}
