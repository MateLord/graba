import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export default function TextFileData() {
    const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    fetch('data.txt')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(err => console.error(err));
  }, []);

  return (
    <div>
        <p> <Tabs data={data} /></p>
    </div>
  );
}

interface Data {
  name: string;
  link: string;
  describe: string;
  env: string;
}

interface Props {
  data: Data[];
}

const JSONDataTable: React.FC<Props> = ({ data }) => {

  return (
    <TableContainer component={Paper}>
      <Table aria-label="json data table">
        <TableHead>
          <TableRow>
            <TableCell>Nazwa Aplikacji</TableCell>
            <TableCell align="right">Adres</TableCell>
            <TableCell align="right">Opis</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.link}>
              <TableCell component="th" scope="row">{row.link}</TableCell>
              <TableCell align="right">{row.env}</TableCell>
              <TableCell align="right">{row.describe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Tabs: React.FC<Props> = ({ data }) => {
    const srodowiska = data.filter(
        (thing, i, arr) => arr.findIndex(t => t.env === thing.env) === i
      );

    const [value, setValue] = React.useState(srodowiska[0].env);
  
    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
    };
  
  
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
            {srodowiska.map(row => (
              <Tab label={row.env} value={row.env} />
              ))}
            </TabList>
          </Box>
          {srodowiska.map(row => (
            <TabPanel value={row.env}>
                <JSONDataTable data={data.filter(x => x.env === row.env)} />
            </TabPanel>
            ))}
        </TabContext>
      </Box>
    );
  }
