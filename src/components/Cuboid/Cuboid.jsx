import React, { useEffect, useRef } from "react";
import {
    Engine,
    Scene,
    ArcRotateCamera,
    HemisphericLight,
    MeshBuilder,
    Vector3,
    Color4,
    StandardMaterial,
    Texture,
} from "@babylonjs/core";

const Cuboid = ({ snapshot }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const engine = new Engine(canvasRef.current, true);
            const scene = new Scene(engine);

            scene.clearColor = new Color4(0, 0, 0, 1);

            const camera = new ArcRotateCamera(
                "camera",
                -Math.PI / 2,
                Math.PI / 2.5,
                10,
                Vector3.Zero(),
                scene
            );
            camera.attachControl(canvasRef.current, true);

            camera.lowerRadiusLimit = 10;
            camera.upperRadiusLimit = 10;

            new HemisphericLight("light", new Vector3(1, 1, 0), scene);

            const box = MeshBuilder.CreateBox(
                "box",
                { width: 3, height: 3, depth: 3 },
                scene
            );

            const material = new StandardMaterial("boxMaterial", scene);
            box.material = material;

            engine.runRenderLoop(() => {
                scene.render();
                box.rotation.y += 0.001;
                box.rotation.x += 0.001;
            });

            return () => {
                engine.dispose();
            };
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current && snapshot) {
            const engine = Engine.LastCreatedEngine;
            const scene = engine?.scenes[0];
            const box = scene?.getMeshByName("box");

            if (box) {
                const material = new StandardMaterial("boxMaterial", scene);
                material.diffuseTexture = new Texture(snapshot, scene);
                box.material = material;
            }
        }
    }, [snapshot]);

    return (
        <canvas
            ref={canvasRef}
            style={{ width: "50vw", height: "100vh" }}
        ></canvas>
    );
};

export default Cuboid;
