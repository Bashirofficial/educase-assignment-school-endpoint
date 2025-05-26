import pool from "../db/index.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

//Controller for Adding School Details
const addSchool = AsyncHandler(async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    throw new ApiError(404, "All field are required.");
  }

  const [result] = await pool.query(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { id: result.insertId },
        "School added successfully."
      )
    );
});

//Function for calculating distance between 2 geo-coordinates with Haversine Formule.
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earth_radius = 6371; // Earth's radius in KM

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  //Applying Formula
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earth_radius * c;
};

//Controller for fetching all schools from  the database in a sorted manner based on proximity to the user's location.
const sortedSchoolLists = AsyncHandler(async (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);

  if (isNaN(userLat) || isNaN(userLon)) {
    throw new ApiError(400, "Invalid latitude or longitude.");
  }

  const [schools] = await pool.query("SELECT * FROM schools");

  const sortedSchools = schools
    .map((school) => ({
      ...school,
      distance: calculateDistance(
        userLat,
        userLon,
        school.latitude,
        school.longitude
      ),
    }))
    .sort((a, b) => a.distance - b.distance);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        sortedSchools,
        "Sorted School list has been fetched successfully."
      )
    );
});

export { addSchool, sortedSchoolLists };
