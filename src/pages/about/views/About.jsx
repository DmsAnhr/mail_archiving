import React from 'react';
import profile from '../../../assets/image/profile.jpg'

const About = () => {

  return (
    <div className="min-h-100">
      <div style={{height:"79px"}} className='d-flex align-items-center'>
        <h1 className='m-0'>About</h1>
      </div>

      <div className="d-flex align-items-start">
        <img src={profile} alt="" style={{height:"50vh"}}/>
        <table className='ms-4'>
          <tbody>
            <tr>
              <td colSpan={3} className='fw-500'>Aplikasi ini dibuat oleh :</td>
            </tr>
            <tr>
              <td>Nama</td>
              <td className='px-3'>:</td>
              <td className='fw-500'>Dimas Putra Anhar Wirjo Atmodjo</td>
            </tr>
            <tr>
              <td>Prodi</td>
              <td className='px-3'>:</td>
              <td className='fw-500'>D4 - Teknik Informatika</td>
            </tr>
            <tr>
              <td>NIM</td>
              <td className='px-3'>:</td>
              <td className='fw-500'>2141720258</td>
            </tr>
            <tr>
              <td>Tanggal</td>
              <td className='px-3'>:</td>
              <td className='fw-500'>27 November 2024</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default About;
