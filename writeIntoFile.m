function writeIntoFile(inputData)
    fileID = fopen('out.txt','w');
    for i = 1:length(inputData)
        fprintf(fileID,"%s",inputData{i});
        if i ~= length(inputData)
            fprintf(fileID, "\n");
        end
    end
    fclose(fileID); 
end