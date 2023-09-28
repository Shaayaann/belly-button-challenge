

const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"


function init(){

    //Select  dropdown with D3
    let dropitems = d3.select("#selDataset")

    //extract data 
    d3.json(url).then((data) => {


        let names = data.names;


        names.forEach((name) => {
            dropitems.append("option")
            .text(name)
            .property("value",name);
        });
        
        //set the first name from samples
        name1 = names[0];
        console.log(name1)

        //call functions to initialise graphs
        Demographics(name1);
        Bar_Chart(name1);
        Bubble_Chart(name1);
    });
}

//create function to show demographic info
function Demographics(sample) {

    d3.json(url).then((data) => {

        let metadata = data.metadata;
        
   
        let sample_value = metadata.filter((value) => value.id == sample);

        console.log(sample_value)
      
        let first_sample_value = sample_value[0]
        
    
        d3.select("#sample-metadata").html("");
  
    
        Object.entries(first_sample_value).forEach(([key,value]) => {
            console.log(key,value);
            
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });
};

//create function to show bar chart
function Bar_Chart(sample) {

    d3.json(url).then((data) => {

        let sample_objects = data.samples;


        let sample_value = sample_objects.filter((value) => value.id == sample);

        let first_sample_value = sample_value[0];
        
        let sample_values = first_sample_value.sample_values;
        let otu_ids = first_sample_value.otu_ids;
        let otu_labels = first_sample_value.otu_labels;
        
        console.log(otu_ids,otu_labels,sample_values);

        //  top 10 results
        let trace = [{
            x: sample_values.slice(0,10).reverse(),
            y: otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: otu_labels.slice(0,10).reverse(),
            type: "bar",
            orientation: "h"
        }];
        
  
        Plotly.newPlot("bar", trace);
    });
};

//create function to show bubble chart
function Bubble_Chart(sample) {

    d3.json(url).then((data) => {

 
        let sample_objects = data.samples;

      
        let sample_value = sample_objects.filter((value) => value.id == sample);

 
        let first_sample_value = sample_value[0];
        
      
        let sample_values = first_sample_value.sample_values;
        let otu_ids = first_sample_value.otu_ids;
        let otu_labels = first_sample_value.otu_labels;
        
        console.log(otu_ids,otu_labels,sample_values);

        //  top 10 results
        let trace2 = [{
            x: otu_ids,
            y:sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Portland"
            }
        }];



        let layout = {
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", trace2, layout);
    });
};

    // update dashboard 
    function optionChanged(sample_value) {
        console.log(sample_value);

        Demographics(sample_value);
        Bar_Chart(sample_value);
        Bubble_Chart(sample_value);
    };
    
    init();