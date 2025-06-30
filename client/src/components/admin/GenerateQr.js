import React, { useState, useRef } from "react";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";

const GenerateQr = () => {
  const [tableId, setTableId] = useState("");
  const [tableName, setTableName] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const qrRef = useRef();

  const handleGenerate = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/admin/generate-qr`,
        {
          tableId,
          tableName: tableName || `Table ${tableId}`,
        }
      );

      setQrUrl(res.data.qrUrl);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("🚫 Table ID already exists. Please choose a different one.");
      } else {
        alert("❌ Something went wrong while generating QR.");
        console.error(error);
      }
    }
  };

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector("canvas");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_${tableId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Generate Table QR Code
        </Typography>

        <TextField
          fullWidth
          label="Table ID (e.g., TBL001)"
          variant="outlined"
          value={tableId}
          onChange={(e) => setTableId(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Table Name (optional)"
          variant="outlined"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Button variant="contained" fullWidth onClick={handleGenerate}>
          Generate QR
        </Button>

        {qrUrl && (
          <Box textAlign="center" mt={4} ref={qrRef}>
            <QRCodeCanvas value={qrUrl} size={200} />
            <Typography variant="caption" display="block" mt={1}>
              {qrUrl}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownload}>
              Download QR Code
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default GenerateQr;
