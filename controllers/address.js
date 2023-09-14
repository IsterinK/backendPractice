const express = require('express')
const axios = require('axios')
const fetch = require('node-fetch')

const getAddresses = async (req, res)=>{
    try {
        const url = "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        const response = await fetch(url)
        const data = await response.json()

        const uniqueData = [];
        const departamentoSet = {};
        for (const item of data) {
            const departamento = item.departamento;
            if (!departamentoSet[departamento]) {
                departamentoSet[departamento] = true;
                uniqueData.push(departamento);
            }
        }
        res.status(200).json(uniqueData)
    } catch (err) {
        console.error(err)
    }
};

const getAddressesAxios = async (req, res) => {
    try {
        const url = "https://www.datos.gov.co/resource/xdk5-pm3f.json"
        const response = await axios.get(url);
        const data = response.data;

        const uniqueData = [];
        const departamentoSet = {};
        for (const item of data) {
            const departamento = item.departamento;
            if (!departamentoSet[departamento]) {
                departamentoSet[departamento] = true;
                uniqueData.push(departamento);
            }
        }
        res.status(200).json(uniqueData)
    } catch (err) {
        console.error(err);
    }
};

const getMun = async (req, res) => {
    const department = req.params.department;
    try {
        const response = await fetch(`https://www.datos.gov.co/resource/xdk5-pm3f.json?departamento=${department}`);
        if(response.length() === 0){
            res.status(500).json({ error: 'El departamento ingresado es invalido o no existe' });
        }else{
            const data = await response.json();
            const municipios = [];
            for (const item of data) {
                municipios.push(item.municipio);
            }
            res.status(200).json(municipios);
        }
    } catch (error) {
        console.error(error);
    }
};

module.exports = {getAddresses, getAddressesAxios, getMun}