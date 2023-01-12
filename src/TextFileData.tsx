import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import TablePagination from '@mui/material/TablePagination';
import { styled } from '@mui/material';

const StyledTableHeader = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.action.disabledBackground,
      color: theme.palette.text.secondary,
    }}));


const TextFileData: React.FC = () => {
        const [data, setData] = useState<any>(null);
      
        useEffect(() => {
          fetch('plik.json')
            .then(response => response.json())
            .then(jsonData => setData(jsonData))
            .catch(error => console.error(error));
        }, []);
      
        if (!data) {
          return <div>Loading...</div>;
        }
      
        return  <p> <Tabs data={data} /></p>
      };

export default TextFileData;

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

    const [copyList, setCopyList] = useState(data)

    const requestSearch = (searched: any) => {
    setCopyList(data.filter((item) => item.name.includes(searched.value)))
}
  return (
    <Paper>
       <TextField fullWidth
            variant='outlined'
            placeholder='wyszukaj po nazwie...'
            type='search'
            onInput={(e) => requestSearch(e.target)}
          />
    <TableContainer component={Paper}>
    
      <Table aria-label="json data table">
        <TableHead>
          <TableRow>
            <StyledTableHeader>Nazwa Aplikacji</StyledTableHeader>
            <StyledTableHeader align="right">Adres</StyledTableHeader>
            <StyledTableHeader align="right">Opis</StyledTableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {copyList.map(row => (
            <TableRow key={row.link}>
              <TableCell component="th" scope="row">{row.name}</TableCell>
              <TableCell align="right"><Link href={row.link}>{row.link}</Link></TableCell>
              <TableCell align="right">{row.describe}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Paper>

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
  
  /* wyświetla taby z nazwami środowisk */
    return (
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="nazwy srodowisk">
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
