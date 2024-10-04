import { Box, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ITestData } from "../interfaces/ITestData";

export const Dashboard = () => {
  const [testData, setTestData] = useState<ITestData[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/test");
        const data = await res.json();
        setTestData(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Heading>QR code</Heading>
      <Text>Generated {testData?.length} times</Text>
      {testData && (
        <Box>
          {testData?.map((test) => (
            <Text key={test.id}>{test.name}</Text>
          ))}
        </Box>
      )}
    </Box>
  );
};
