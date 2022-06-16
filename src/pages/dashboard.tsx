import { Box, Flex, SimpleGrid, Text, theme } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Header } from '../components/Header';
import { Sidebar } from '../components/SideBar';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr:false,
})


const options = {
    chart: {
        toolbar:{
            show:false,
        },
        zoom:{
            enabled:false,
        },
        foreColor: theme.colors.gray[500],
    },
    grid:{
        show:false,
    },
    dataLabels:{
        enabled:false,
    },
    tooltip:{
        enabled:false,
    },
    xaxis:{
        type:'datetime' as const,
        
        axisBorder:{
            color:theme.colors.gray[600],
        },
        axisTicks:{
            color: theme.colors.gray[600],
        },
        categories:[
            '2022-03-10T00:00:00.000Z',
            '2022-03-11T00:00:00.000Z',
            '2022-03-12T00:00:00.000Z',
            '2022-03-13T00:00:00.000Z',
            '2022-03-14T00:00:00.000Z',
            '2022-03-15T00:00:00.000Z',
        ],
            
    },
    fill:{
        opacity: 0.3,
        type:'gradient',
        gradient:{
            shade: 'dark',
            opacityFrom: 0.7,
            opacityTo: 0.3,
        },        
    },
};

const series = [
    {name: 'series1', data:[100, 20, 30, 120, 20, 200]}
];

export default function Dashboard(){
    return(
        <Flex direction="column" h="100vh">
            <Header />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />

                <SimpleGrid flex="1" gap="4" minChildWidth={320} alignItems="flex-start">
                    <Box
                        p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4"> Week Subscribers </Text>
                        <Chart options={options} series={series} type="area" height={160}/>
                    </Box>
                    <Box
                         p={["6","8"]}
                        bg="gray.800"
                        borderRadius={8}
                        pb="4"
                    >
                        <Text fontSize="lg" mb="4"> Opening Tax </Text>
                        <Chart options={options} series={series} type="area" height={160}/>
                    </Box>
                </SimpleGrid>
            </Flex>
        </Flex>

    );
}