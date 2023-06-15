echo off
echo Deseja recompilar todo o projeto novamente?
pause
echo ...
echo Recompilando ...
echo ...
cd\projetos\finan-app\
rd /s/q android
rd /s/q www
cd\projetos\finan-app\recompilar\scripts
CALL build.bat
cd\projetos\finan-app\recompilar\scripts
CALL cap_add_android.bat
cd\projetos\finan-app\recompilar\scripts
CALL cap_copy.bat
cd\projetos\finan-app\recompilar\scripts
CALL copy_android_files.bat
cd\projetos\finan-app\recompilar\scripts
CALL capacitor-resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL capacitor-resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL run_resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL run_resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL run_resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL run_resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL run_resources.bat
cd\projetos\finan-app\recompilar\scripts
CALL cap_open_android.bat

echo Projeto recompilado


