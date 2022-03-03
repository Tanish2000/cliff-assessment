import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import Chart from './Chart'
import ReactPaginate from 'react-paginate'
import Data from "../img/analysis.png";

const Visualiser = () => {

    const styles = {
        headTypo: {
            color: 'white',
            fontFamily: `'Ubuntu', sans-serif`,
            fontSize: 25,
        },
    }
    const [pageNumber, setPageNumber] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [chartData, setChartData] = useState({
        max_band: [],
        min_band: [],
        original_value: [],
        forcasted_value: [],
        time_stamp: [],
        line_status: [],
        measure: '',
        country: '',
        product_family: '',
        device_type: '',
        os: ''
    });


    useEffect(() => {
        async function getDataByID(id) {
            try{
                setIsLoading(true);
                const res = await fetch(`/getData/${id}`);
                const data = await res.json();
                console.log(data);
                setChartData({
                    max_band: data.metric_data.map((entry) => (entry.max_band)),
                    min_band: data.metric_data.map((entry) => (entry.min_band)),
                    original_value: data.metric_data.map((entry) => (entry.original_value)),
                    forcasted_value: data.metric_data.map((entry) => (entry.forecasted_value)),
                    time_stamp: data.metric_data.map((entry) => entry.timestamp.split('T')[0]),
                    line_status: data.metric_data.map((entry) => entry.line_status),
                    measure: data.metric_meta_data.measure,
                    country: data.metric_meta_data.dimensions[0].value,
                    productfamily: data.metric_meta_data.dimensions[1].value,
                    devicetype: data.metric_meta_data.dimensions[2].value,
                    os: data.metric_meta_data.dimensions[3].value,
                })
                setIsLoading(false);
            }
            catch(err){
                console.log(err);
            }
        }
        getDataByID(pageNumber);
    }, [pageNumber])


    const handlePageClick = (pageNum) => {
        setPageNumber(pageNum.selected);
    }

    return (
        <>
            <Container fluid >
                <Row className="text-light m-5">
                    <Col xs={9}>
                        <div className="d-flex bg-light p-2 shadow-lg-light">
                            <Chart chartData={chartData} />
                        </div>
                    </Col>
                    <Col xs={3} className="d-flex flex-column justify-content-center">
                        <div className="d-flex align-items-center">
                            <img
                                src={Data}
                                height="40"
                                width="40"
                                className="mx-1"
                                alt="logo"
                            />
                            <h5 style={styles.headTypo}>Analytics</h5>
                            {
                                isLoading &&
                                <div class="spinner-border text-light m-3" role="status"></div>
                            }
                        </div>
                        <div className="d-flex flex-column align-items-start ">
                            <div className='p-2 m-3'>
                                <table className="table table-borderless text-light">
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h6>Measure</h6>
                                            </td>
                                            <td>
                                                <div className='mx-3 display_box'>
                                                    <span>{chartData.measure}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className='mb-3 h6'><i><b>Dimensions</b></i></td>
                                        </tr>
                                        {/* <hr /> */}
                                        <tr>
                                            <td>
                                                <h6>Country</h6>
                                            </td>
                                            <td>
                                                <div className='mx-3 display_box'>
                                                    <span>{chartData.country}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6>Product Family</h6>
                                            </td>
                                            <td>
                                                <div className='mx-3 display_box'>
                                                    <span>{chartData.productfamily}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6>Device Type</h6>
                                            </td>
                                            <td>
                                                <div className='mx-3 display_box'>
                                                    <span>{chartData.devicetype}</span>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h6>OS</h6>
                                            </td>
                                            <td>
                                                <div className='mx-3 display_box'>
                                                    <span>{chartData.os}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        {/* //Pagination */}
                        <div className='d-flex justify-content-start p-1'>
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">>"
                                previousLabel="<<"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={1}
                                pageCount={24}
                                marginPagesDisplayed={2}
                                containerClassName={"paginationBttns"}
                                previousClassName={"previousBttn"}
                                nextClassName={"nextBttn"}
                                disabledClassName={"paginationDisabled"}
                                activeClassName={"paginationActive"}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Visualiser;